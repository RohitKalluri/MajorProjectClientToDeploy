import "./table.css";
const STYLE = {
    width: "100px",
    height: "100px",
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    padding: '200px',
    zIndex: 100,
}
const OVERLAY = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
}
const Modal = ({ open,timeData ,onClose }) => {
    console.log(timeData , " MODALLL")
    if (!open) return null;
    while(timeData.length<6)timeData.push({inTime:"",outTime:""})
    return (
        <div style={OVERLAY}>
            <div style={STYLE}>
                <div style={{top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'}}>
                    <table id="time">
                        <tbody>
                        <tr>
                            <th>In Time</th>
                            <th>Out Time</th>
                        </tr>
                        {timeData.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.inTime}</td>
                                    <td>{val.outTime}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <button onClick={onClose} className="submit-button" style={{margin:"10px",float:"right"}}><i class="fas fa-times"></i></button>
        </div>
    );
};

export default Modal;