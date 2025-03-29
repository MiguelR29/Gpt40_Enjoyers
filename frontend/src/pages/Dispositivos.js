import { useAuth0 } from "@auth0/auth0-react";
import "../styles/dispositivos.css";

function Dispositivos() {
    const { logout } = useAuth0();

    return (
        <div className="mainContainer">
            <header>
                <div className="encerrar">
                    <h1 className="mainTitle">Dispositivos en la Red</h1>
                    <div className="contenedorMenu">
                        <a href="/dashboard">Dashboard</a>
                        <a href="/init">ChatBot</a>
                        <a href="/logs">Registros</a>
                    </div>
                </div>
                <button id="btnCerrar" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Cerrar sesión
                </button>
            </header>

            <div className="mainDispositivos">
                <div className="mainCategoria">
                    <h1>Dispositivos Permitidos</h1>
                    <div className="dispositivosContainer">
                        <div className="cardDispositivo">
                            <h4>Samsung a54</h4>
                            <h5>IP: 45.67.89.101</h5>
                            <p className="btnPermitir">No Permitir</p>
                        </div>
                        <div className="cardDispositivo">
                            <h4>Iphone 13</h4>
                            <h5>IP: 19.5.97.106</h5>
                            <p className="btnPermitir">No Permitir</p>
                        </div>
                    </div>
                </div>
                <div className="mainCategoria">
                    <h1>Dispositivos No Permitidos</h1>
                    <div className="dispositivosContainer">
                        <div className="cardDispositivo">
                            <h4>Samsung a52</h4>
                            <h5>IP: 192.168.1.11</h5>
                            <p className="btnNoPermitir">Permitir</p>
                        </div>
                        <div className="cardDispositivo">
                            <h4>Xioami POCO</h4>
                            <h5>IP: 206.232.160.33</h5>
                            <p className="btnNoPermitir">Permitir</p>
                        </div>
                        <div className="cardDispositivo">
                            <h4>PC (Miguel)</h4>
                            <h5>IP: 192.168.1.16</h5>
                            <p className="btnNoPermitir">Permitir</p>
                        </div>
                        <div className="cardDispositivo">
                            <h4>PC (Hugo)</h4>
                            <h5>IP: 206.232.160.43</h5>
                            <p className="btnNoPermitir">Permitir</p>
                        </div>
                        <div className="cardDispositivo">
                            <h4>Laptop (Pedro)</h4>
                            <h5>IP: 19.5.97.110</h5>
                            <p className="btnNoPermitir">Permitir</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dispositivos;