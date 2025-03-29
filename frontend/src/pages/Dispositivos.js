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
        </div>
    );
}

export default Dispositivos;