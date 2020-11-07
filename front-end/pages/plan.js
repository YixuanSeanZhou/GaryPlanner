import Link from 'next/link'
import Head from 'next/head'
import PlanCalendar from '../components/planCalendar'
import {GaryNavbar} from '../components/commonUI'

export default function Plan() {
    return (
        <>
            <Head>
                <title>Plan</title>
            </Head>

            <GaryNavbar>
                4 Year Plan
            </GaryNavbar>

            <div id="planCalendar">
                <PlanCalendar />
            </div>
        </>
    )
}