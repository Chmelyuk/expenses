import './Bar.css'


const Bar = (props) => {
    let barHeight = '0%';
    if (props.maxValue > 0) {
        barHeight = Math.round(props.value / props.maxValue *100)+'%';
    }
    return(
    <div className='diagram-bar'>
        <div className='diagram-bar__inner'>
            <div className='diagram-bar__fill' style={{
                height: barHeight
            }}>
                
            </div>

        </div>
    <div className='diagram-bar__label'>{props.label}             
                </div>
    </div>)

}

export default Bar;