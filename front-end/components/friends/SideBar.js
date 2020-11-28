import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'

const SideBar = () => {
	return (
		<ProSidebar>
			<SidebarHeader style={{ backgroundColor: '#092A59' }}>
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

			<SidebarContent style={{ backgroundColor: '#092A59' }}>
				<Menu iconShape="square">
					<MenuItem>Nik Mitra</MenuItem>
					<MenuItem>Xuezheng Wang</MenuItem>
					<MenuItem>Huaming Chen</MenuItem>
					<MenuItem>Mingyang Liu</MenuItem>
				</Menu>
			</SidebarContent>

			<SidebarFooter style={{ textAlign: 'center' }}>
				<div
					style={{
						padding: '10px 10px',
					}}>
					<p>footer</p>
				</div>
			</SidebarFooter>
		</ProSidebar>
	)
}

export default SideBar
