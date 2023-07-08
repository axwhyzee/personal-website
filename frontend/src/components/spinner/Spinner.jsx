import './spinner.css';

function Spinner({msg=''}) {
    return (
        <div className='spinner-wrapper'>
            <div className='spinner'>
                <div className='planet' />
                <div className='aesteroid ast-1' />
                <div className='aesteroid ast-2' />
                <div className='aesteroid ast-3' />
                <div className='aesteroid ast-4' />
            </div>
            {msg && <span className='spinner-msg'>{msg}</span>}
        </div>
    )
}

export default Spinner;