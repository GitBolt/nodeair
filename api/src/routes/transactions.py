from datetime import datetime
from typing import Optional
from datetime import datetime
from fastapi.responses import JSONResponse
from fastapi import Request, APIRouter, Depends
from core.ratelimit import Limit
from utils import lamport_to_sol
from calendar import monthrange

router = APIRouter(prefix="/transactions")

@router.get("/activity/{public_key}",
            dependencies=[Depends(Limit(times=30, seconds=5))],
            status_code=200
            )
async def activity(public_key: str,  request: Request, limit: int = 4) -> JSONResponse:

    resp = await request.app.request_client.get(
                ("https://api.solscan.io/account/"
                f"soltransfer/txs?address={public_key}&offset=0&limit={limit}")
                )

    data = resp.json()["data"]["tx"]["transactions"]
    filtered_data = []
    for i in data:
        sols = round(lamport_to_sol(i["lamport"]), 3)
        if i["src"] == public_key:
            d = {"type": "sent", "amount": sols, "to": i['dst'], "tx": i["txHash"], "time": i["blockTime"]}
            filtered_data.append(d)
        else:
            d = {"type": "received", "amount": sols, "from": i['src'], "tx": i["txHash"], "time": i["blockTime"]}
            filtered_data.append(d)


    return JSONResponse(
        content=filtered_data
    )

@router.get("/{public_key}",
            dependencies=[Depends(Limit(times=20, seconds=5))],
            status_code=200)
async def transactions(public_key: str, request: Request,  month_now: Optional[int] = None) -> dict:
    if not month_now:
        month_now = datetime.utcnow().month
    else:
        month_now += 1
    amount_of_days = monthrange(2021, month_now)[1]
    
    resp = await request.app.request_client.get(
                ("https://api.solscan.io/account/soltransfer/txs?"
                f"address={public_key}&offset=0&limit=500")
                )
    if (resp.status_code == 429):
        return JSONResponse(status_code=429, content="You are being rate limited, try again after sometime")

    transactions = resp.json()["data"]["tx"]["transactions"]
    t = [
        i for i in transactions if 
        datetime.fromtimestamp(i["blockTime"]).month == 
        month_now
        ]

    days = [datetime.fromtimestamp(i["blockTime"]).day for i in t 
            if datetime.fromtimestamp(i["blockTime"]).month == month_now]

    def get_sent(day):
        received = [lamport_to_sol(i["lamport"]) for i in 
                    t if datetime.fromtimestamp(i["blockTime"]).day == day 
                    and i["dst"] == public_key]

        sent = [lamport_to_sol(i["lamport"]) for i in t 
            if datetime.fromtimestamp(i["blockTime"]).day == day 
            and i["src"] == public_key]

        return received, sent

    data = {}
    print(t)
    init_ratio = [0, 0]
    for i in range(1, amount_of_days + 1):
        if i not in days:
            data.update({i: {"received": 0, "sent": 0}})
        else:
            received, sent = get_sent(i)
            data.update({i: {"received": sum(received), "sent": sum(sent)}})
            init_ratio[0] += sum(received)
            init_ratio[1] += sum(sent)

    ratio_sum = sum(init_ratio)
    print(data)
    try:
        ratio = [round(init_ratio[0] / ratio_sum * 100, 2),round(init_ratio[1] / ratio_sum * 100, 2)]
    except Exception:
        ratio = [0,0]
    return {"transactions": data, "ratio": ratio} 