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
                            <img className="logo" src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png" alt="digitalcrafts-logo" />
                        </div> 
                        <div className="MemoryCardFront">{this.props.symbol}</div>
                    </div>
                </div>
            </>  
        ) 
    }
}

export default MemoryCard;


