import "../styles/dispositivos.css";

function Dispositivos() {
    return (
        <div className="mainContainer">
            <header>
                <h1 className="mainTitle">Dispositivos en la Red</h1>
                <div className="contenedorMenu">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/init">ChatBot</a>
                    <a href="/logs">Registros</a>
                </div>
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