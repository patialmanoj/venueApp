import React from 'react';
import VotingCell from './VotingCell';

const ParticipantsRow = ({participant,onVoteClick, venues ,participantObj}) => {
        
        return(
            <tr key={participant.p_id}>
                <td className="lp-cell-grid"> <b> {participant.name.toUpperCase() }</b></td>
                {
                 venues.map( venue => 
                    <VotingCell
                        key = { 'cell_'+ participant.p_id+ venue.v_id}
                        participantName = {participant.name}
                        participantId = {participant.p_id}
                        onVoteClick = {onVoteClick}
                        venueId = {venue.v_id}
                        isClicked = { (participantObj[participant.p_id]["clicked_cell_id"] === ( participant.p_id +'_cd_' +venue.v_id))? true: false }
                    >
                    </VotingCell>
                )   
               }
            </tr>
        );
    };

export default ParticipantsRow;