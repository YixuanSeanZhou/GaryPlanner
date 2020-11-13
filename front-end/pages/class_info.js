import Link from 'next/link'
import Head from 'next/head'
// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/class_info.module.css'

export default function Class_info() {
    return (
        <>
            <Head>
                <title>Plan</title>
            </Head>

            <GaryNavbar>
                <Navbar.Text>
                   Class Information
                </Navbar.Text>
            </GaryNavbar>
            <Container>
                <h1 className="text-center">CSE 110. Software Engineering (4)</h1>
                <p className="text-center">Introduction to software development and engineering methods, including specification, design, implementation, testing, and process. An emphasis on team development, agile methods, and use of tools such as IDE’s, version control, and test harnesses. Prerequisites: CSE 100; restricted to students with junior or senior standing within the CS25, CS26, CS27, CS28, and EC26 majors. All other students will be allowed as space permits.</p>

                <div class="wrapper">
                <div class="item">Spring 2020</div>
                <div class="item">Winter 2020</div>
                <div class="item">Fall 2019</div>
                <div class="item">Spring 2019</div>
                <div class="item">Winter 2019</div>
                <div class="item">Fall 2018</div>
                <div class="item">Spring 2018</div>
                <div class="item">Winter 2018</div>
                <div class="item">Fall 2017</div>
            </div>
            </Container>   
        </>
    )
}