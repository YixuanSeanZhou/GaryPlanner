import Head from 'next/head'
import HomeNav from '../components/homeNav'
import { Navbar } from 'react-bootstrap'
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from 'react-pro-sidebar'
import Link from 'next/link'
import 'react-pro-sidebar/dist/css/styles.css'

export default function Friends() {
	return (
		<>
			<Head>
				<title>Friends</title>
			</Head>

			<HomeNav>
				<Navbar.Text>Friends</Navbar.Text>
			</HomeNav>

			<div>
				<ProSidebar>
					<SidebarHeader>
						<div
							style={{
								padding: '24px',
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: 14,
								letterSpacing: '1px',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}>
							Friends
						</div>
					</SidebarHeader>

					<Menu iconShape="square" style={{ backgroundColor: '#061d3d' }}>
						<MenuItem>Nik Mitra</MenuItem>
						<MenuItem>Xuezheng Wang</MenuItem>
						<MenuItem>Huaming Chen</MenuItem>
						<MenuItem>Mingyang Liu</MenuItem>
					</Menu>
					<SidebarFooter>
						<p>footer</p>
					</SidebarFooter>
				</ProSidebar>
			</div>
		</>
	)
}
