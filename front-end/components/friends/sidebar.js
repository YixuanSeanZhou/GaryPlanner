import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Sidebar.module.css'
import FriendList from './friendList'

export default class Sidebar extends React.Component {
	render() {
		return (
			<>
				<div className={styles.all}>
					<div className={styles.sidebar}>
						<ul className={styles.sideMenu}>
							<h4 className="mt-3">Friends</h4>
							{FriendList.map((item, index) => {
								return (
									<li key={index} className={item.class}>
										<Link href={item.path}>{item.name}</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</>
		)
	}
}
