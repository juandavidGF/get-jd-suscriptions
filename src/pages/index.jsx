import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const inter = Inter({ subsets: ['latin'] })


export async function getStaticProps(context) {
	const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default function Home() {

	const { t } = useTranslation('common');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		if (!email) return;
		try {
			const res = await fetch('/api/new-suscripter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: email, appName: "live-stream 17th March" }),
			});
			const data = await res.json();
			if(data.success === 'Ok') {
				document.getElementById('status').style.color  = "green"
				document.getElementById('status').innerHTML = 'Subscription successful';
			} else {
				document.getElementById('status').style.color  = "red"
				document.getElementById('status').innerHTML = 'Error';
			}
		} catch (error) {
			console.log(error)
			document.getElementById('status').style.color  = "red"
			document.getElementById('status').innerHTML = 'Error';
		}
		e.target.email.value = '';
	}

  return (
    <>
      <Head>
        <title>JDAI events</title>
        <meta name="description" content="Coding with GPT-4 for AI Solutions & Software Development!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
				<div className={styles.content}>
					<Link href="https://artmelon.me"><img src="/icon.png" alt="logo artMelon" width="100px" height="100px"  /></Link>
					<h1>{t('title')}</h1>
					<h2>{t('subtitle')}</h2>
					<p className={styles.date}>{t('p1')}</p>
					{/* <p>{t('p2')}</p> */}
					<p>{t('p3')}</p>
					<p style={{color: "#D2691E"}}>{t('p4')}</p>
					<br/><form onSubmit={handleSubmit} className="suscription">
						
						<p>{t('label-cta')}</p>
						{/* <input className={styles.wdyw} type="text" id="email" placeholder="example@aimnerd.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" /><br/> */}
						<input className={styles.email} type="text" id="email" placeholder="example@aimnerd.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
						<button className={styles.suscribe} type="submit">{t('cta-button')} </button>
						<div id='status'></div>
					</form><br/>
					{/* <p><u>Price: 4 USD/month</u></p>
					<p>You can select the Language of your preference</p> */}
				</div>
      </main>
    </>
  )
}
