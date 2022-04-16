import React from 'react'
import './MemoryCard.css'

class MemoryCard extends React.Component {
    render() {
        let memoryCardInnerClass= "MemoryCardInner"

        if (this.props.isFlipped) {
            memoryCardInnerClass += " flipped";
          }

       return (
            <>
                <div className="MemoryCard" onClick={this.props.pickCard}>
                    <div className={memoryCardInnerClass}>
                        <div className="MemoryCardBack">
                        </div> 
                        <div className="MemoryCardFront"><img className="image" src={this.props.image.src} alt="card front"></img></div>
                    </div>
                </div>
            </>  
        ) 
    }
}

export default MemoryCard;


