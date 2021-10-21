"""Dummy transaction example for now"""

import os
import asyncio

import base58
from solana.keypair import Keypair
from solana.transaction import Transaction
from solana.rpc.async_api import AsyncClient
from solana.system_program import TransferParams, transfer

sender_pubkey = "B3BhJ1nvPvEhx3hq3nfK8hx4WYcKZdbhavSobZEA44ai"
receiver_pubkey = "8kgbAgt8oedfprQ9LWekUh6rbY264Nv75eunHPpkbYGX"
sender_privkey = os.environ["PRIVATE_KEY"]

async def main():
    async with AsyncClient("https://api.devnet.solana.com") as client:
        encoded_privkey = base58.b58decode(sender_privkey)
        sender_kp = Keypair.from_secret_key(encoded_privkey)

        txn = Transaction().add(transfer(TransferParams(
                                        from_pubkey=sender_pubkey, 
                                        to_pubkey=receiver_pubkey, 
                                        lamports=1)
                                        ))
        transaction = await client.send_transaction(txn, sender_kp)
        print(transaction)

asyncio.run(main())

