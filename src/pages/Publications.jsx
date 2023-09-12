import Navbar from '../components/Navbar';
import PublicationsCard from '../components/PublicationsCard';
import Icon from '../components/Icon';
import NavbarVertical from '../components/NavbarVertical';
import TopBar from '../components/TopBar';
function Publications() {
    return (
        <>
            <div className='container-fluid'>
                <div className='d-md-none'>
                    <Navbar title={'Mis Publicaciones'} />
                </div>
                <TopBar />
                <div className='row'>
                    <div className='d-none d-md-inline col-md-3 col-lg-3'>
                        <NavbarVertical />
                    </div>
                    <div className='col-10 offset-1 col-md-8 offset-md-0 offset-lg-1 col-lg-7 d-flex flex-column align-items-center'>
                        <PublicationsCard />
                        <PublicationsCard />
                        <PublicationsCard />
                    </div>
                </div>
                <div className='midiv row col-12 d-md-none d-lg-none fixed-bottom'>
                    <div className='text-primary text-opacity-75 fs-6 text-center col-6'>
                        <i><Icon type={'solid'} symbol={'house'} />
                            <p className='fs-6'>Home</p></i> </div>
                    <div className='text-primary text-opacity-75 fs-6 text-center col-6'>
                        <i><Icon type={'solid'} symbol={'user'} />
                            <p>Profile</p></i>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Publications;