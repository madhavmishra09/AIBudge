const scoringEngine =(data)=>{
    let score=10;
    let findings=[]
    if(data.teamSatisfaction==='Very Unsatisfied'){
        score-=3;
        findings.push('Low team satisfaction detected');
    }
    if(data.teamSatisfaction==='Mostly Unsatisfied'){
        score-=2;
        findings.push('Low team satisfaction detected');
    }
    if(data.painPoints?.includes('Overlapping subscriptions')){
        score-=2;
        findings.push('Subscription overlap detected');
    }
    if(data.painPoints?.includes('Too expensive')){
        score-=2;
        findings.push('AI stack cost concerns identified');
    }
    score=Math.max(score,1)
    return {score, findings};
}
module.exports = scoringEngine;