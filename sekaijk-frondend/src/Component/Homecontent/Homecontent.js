import './Homecontent.css'
import 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'

function Homecontent(){
	return (
		<Layout>
			<Layout.Header className='heacer-content-cont'>
				<Menu mode='horizontal' className='menu-header'>
					<Menu.Item key={0} className="whenOver">
						<Link to={'/'} style={{color:'white'}}>Inicio</Link>
					</Menu.Item>
					<Menu.Item key={1} className="whenOver">
						<Link to={'/anime'} style={{color:'white'}}>
							Anime
						</Link>
					</Menu.Item>
				</Menu>
			</Layout.Header>
			<Layout.Content>
				<Outlet/>
			</Layout.Content>
		</Layout>
	)
}

export default Homecontent