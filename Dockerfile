FROM python:3

COPY /maskpay /root

WORKDIR /root

RUN pip install fastapi uvicorn motor solana

CMD uvicorn main:app --host 0.0.0.0 --port 8000