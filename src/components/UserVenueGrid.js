import React from 'react';
import VenueCellHeader from "./VenueCellHeader";
import ParticipantsRow from "./ParticipantsRow";
class UserVenueGrid extends React.Component {

    constructor(props){
        super(props);

        this.state={
            dicPerVenueClickCount: {} , // will contain the venue voting 
            dicPerParticipantClickCount : {}
        }
        this.handelVoteclick= this.handelVoteclick.bind(this);
    }
    componentWillReceiveProps(nextprops){
        let countVenueClicks= {} , countParticipantClick= {};
        for(let v of nextprops.venueDetails){
            countVenueClicks[v.v_id] = { 'clicks' : 0,
                                         'is_winner': false
                                        };
        }
        for(let p of nextprops.participants){
            countParticipantClick[p.p_id]= {'clicks': 0,
                                            'cell_clicked': false,
                                            'clicked_cell_id' :''
                                            };
        }
        

        this.setState({
                        dicPerVenueClickCount: countVenueClicks , // will contain the venue voting 
                        dicPerParticipantClickCount : countParticipantClick
                    });
    }

    handelVoteclick(participant_name,venue_id, participant_id){
       
        console.log("vote is clicked by " + participant_name  + 'for venue id '  +venue_id + 'with  participate id '+participant_id );
        
        let ob= {}
        ob[participant_id] = {
                "clicks" :1,
                "cell_clicked" : !this.state.dicPerParticipantClickCount[participant_id]['cell_clicked'],
                "clicked_cell_id":  participant_id +'_cd_'+ venue_id

        }
      
        let participantObj = Object.assign({},this.state.dicPerParticipantClickCount,ob);
     
        if(this.state.dicPerParticipantClickCount[participant_id]['clicks'] === 0){ // one click  allowed
                    
            let max =0 , selected_venue_id = '';
            ob = {}
            ob[venue_id] = {
                'clicks' : this.state.dicPerVenueClickCount[venue_id]['clicks']+1,
                'is_winner' : false
            }

            let venueCountObj = Object.assign({}, this.state.dicPerVenueClickCount,ob); 
            
            for(let v_id in venueCountObj){
                if( venueCountObj[v_id]["clicks"] > max ){
                    max = venueCountObj[v_id]["clicks"];
                    selected_venue_id = v_id;
                }
                venueCountObj[v_id]["is_winner"] = false; // setting all to false
            }

            venueCountObj[selected_venue_id]["is_winner"] = true; // set the winner


            this.setState({
                         dicPerParticipantClickCount : participantObj,
                         dicPerVenueClickCount : venueCountObj
                        })
            
        }else{
            // decrease the count

        }
    }
    render(){
        const  venues= this.props.venueDetails;
        let  participants =  this.props.participants ; 
        let  venueClickCount = this.state.dicPerVenueClickCount;
        let participantObj = this.state.dicPerParticipantClickCount; 
        let participantCell= "";
        participantCell= ( participants.length > 0)? <td className="lp-vch-hcell"> Participants </td> : ""
        
        return(
            <div className="lp-main-grid">
                <table>
                    <thead>
                        <tr>
                            {participantCell}
                            { 
                                venues.map(venue => 
                                    <VenueCellHeader key={'venue'+venue.v_id}  venue = {venue}  
                                        numberOfTimesClicked= {venueClickCount[venue.v_id]["clicks"]} 
                                        isWinner= {venueClickCount[venue.v_id]["is_winner"]} 
                                        >
                                    </VenueCellHeader>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            participants.map( participant => 
                                    <ParticipantsRow key={'pr'+participant.p_id}  
                                                            participant ={participant}
                                                            onVoteClick= {this.handelVoteclick}
                                                            venues ={venues}
                                                            participantObj  = {participantObj}
                                    ></ParticipantsRow>
                            )
                        } 
                        
                    </tbody>            

                </table>
            </div>
        );

    }

};

export default UserVenueGrid;