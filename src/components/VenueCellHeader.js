import React from 'react';


const VenueCellHeader = ({venue,numberOfTimesClicked ,isWinner}) => {
    let winnerClass =  isWinner ? "check_selected":"";
        return(
            <td key={ 'cell'+venue.v_id } src={venue.src} className="lp-vch-hcell"> 
                <div className="lp-h-mainTitle">{venue.name}</div>
                <div className ="lp-h-subTilte">{venue.title}</div>
                <div className = {winnerClass}>  {numberOfTimesClicked} votes </div>
            </td>
        );
    };

export default VenueCellHeader;