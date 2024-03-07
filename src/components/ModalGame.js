
import './ModalGame.css';

const ModalGame = ({game}) => {
    console.log(game);
    return (
        <div className="modalDialog">
            <div>
                <a href="#close" title="Close" class="close">X</a>
                <p>{game.title}</p>
                <img src={game.image} alt="img" />
                <p>{game.date}</p>
                <div className='description' key={game.id}>
                    <p>{game.description  != undefined? game.description.slice(0, 100):"no tiene descripcion"}...</p>
                </div>
            </div>
        </div>
    )
}

export default ModalGame;