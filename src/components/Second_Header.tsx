import '../styles/Second_Header.css'
import { useEffect } from 'react';
import { Modal } from 'bootstrap';
import { UserIconDropdown } from './User_Icon_Dropdown';
import { StoreIconDropdown } from './Store_Icon_Dropdown';
import { StoreIconMobile } from './Store_Icon_Mobile';


export function SecondHeader() {

    useEffect(() => {
        const modalElement = document.getElementById('modalMagnifyingGlass');
        const triggerElement = document.getElementById('openModal');

        if (modalElement && triggerElement) {
            const modalMagnifyingGlass = new Modal(modalElement);

            const showModal = () => modalMagnifyingGlass.show();

            triggerElement.addEventListener('click', showModal);

            return () => {
                triggerElement.removeEventListener('click', showModal);
            };
        }
    }, []);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg custom-navbar">
                    <div className="container-fluid">
                        <a className="navbar-brand text-white fs-5" href="/Home">L-Art <br></br> Garden</a>
                        <div className="col-2 nav-search flex-grow-1 d-lg-none">
                            <svg width="20" height="20" className="icon-search" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                                    stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                            <input className="form-control form-control-sm" type="search" placeholder="Buscar" aria-label="Search"
                                style={{ paddingLeft: '40px' }}></input>
                        </div>
                        <StoreIconMobile/>
                        <div className="collapse navbar-collapse nav-menu-list justify-content-end">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white fs-5 active" aria-current="page" href="/Home">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white fs-5 active" aria-current="page" href="#">Configuración de la Florería</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white fs-5 active" aria-current="page" href="/Contact">Contacto</a>
                                </li>
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse justify-content-end">
                            <a href="#" id="openModal" className="nav-circle">
                                <i className="fa-solid fa-magnifying-glass fa-xl" style={{ color: '#ffb800' }}></i>
                            </a>
                            <div className="modal fade" id="modalMagnifyingGlass" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form className="nav-search flex-grow-1" role="search">
                                                <i className="fa-solid icon-search fa-magnifying-glass fa-lg" style={{ color: '#abababff' }}></i>
                                                <input className="form-control form-control-sm me-2" type="search" placeholder="Buscar" aria-label="Search"
                                                    style={{ paddingLeft: '40px' }}></input>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="nav-line"></div>
                            </div>
                            <UserIconDropdown/>
                            <div className="p-2">
                                <div className="nav-line"></div>
                            </div>
                            <StoreIconDropdown/>
                        </div>
                    </div>
                </nav>
                <div className="offcanvas offcanvas-start" id="navbarNav2">
                    <div className="offcanvas-header d-flex justify-content-end">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body specific-className">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link fs-6 active" aria-current="page" href="#">
                                    <i className="fa-solid fa-circle-user fa-xl"></i>
                                    <span className="text-black">Cuenta</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link fs-6 active" aria-current="page" href="#">
                                    <i className="fa-solid fa-house fa-lg"></i>
                                    <span className="text-black">Inicio</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black fs-6 active" aria-current="page" href="#">
                                    <i className="fa-solid fa-phone fa-lg"></i>
                                    <span className="text-black">Contacto</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}
