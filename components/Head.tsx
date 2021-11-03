import Head from 'next/head'

type Props = {
    title: string
}

export const DefaultHead = ({ title }: Props) => (
    <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
)