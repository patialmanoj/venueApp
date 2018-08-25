import React from 'react';



const VotingCell = ({participantName, participantId,onVoteClick, venueId ,isClicked}) => {
        
    this.voteClick = () => onVoteClick(participantName,venueId, participantId );

    let renderColumn = isClicked ? <td className="lp-cell-grid check_selected"  onClick={this.voteClick} >   </td> 
                                 : <td className="lp-cell-grid check_unselected"  onClick={this.voteClick} > </td> 
    
    return(
            renderColumn
        );
    };

export default VotingCell;