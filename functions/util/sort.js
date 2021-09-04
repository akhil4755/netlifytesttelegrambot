

function sortFunction ( message )
{
    message = message.toLowerCase();

    let retMessage = {
        "Year" : null,
        "Month" : null,
        "Date" : null,
        "Amount" : 0,
        "Title" : "",
        "Category" : null,
        "Direction" : "Outgoing"
    }

//============================================================================ 

    let today = new Date();
    let dateRef = {
        "now" : {
            "date" : today.getDate(),
            "month" : today.getMonth(),
            "year" : today.getFullYear()
        },
        "today" : {
            "date" : today.getDate(),
            "month" : today.getMonth(),
            "year" : today.getFullYear()
        },
        "yesterday" : {
            "date" : today.getDate() - 1,
            "month" : today.getMonth(),
            "year" : today.getFullYear()
        },
        "tomorrow" : {
            "date" : today.getDate() + 1,
            "month" : today.getMonth(),
            "year" : today.getFullYear()
        }
    }

    let directionRef = {
        "in" : "Input",
        "out" : "Outgoing"
    }

    let categoryRef = ["food","travel","subscription","emi","essentials","freelance","others"]

//============================================================================ 

    //Identify the type of sub string
    function identifyType( sub )
    {
        if( Object.keys( dateRef ).includes(sub)  )
            return "date";
        if( Object.keys( directionRef ).includes(sub)  )
            return "direction";
        if( categoryRef.includes(sub)  )
            return "category";
    }

//============================================================================ 

    console.log("Message : ", message)

    //MAIN WORKFLOW
    if( message.split('"').length === 1 )
    {
        let split = message.split(" ");

        if( split[0].toLocaleLowerCase() === "new" )
        {
            for(let i=1; i<split.length; i++)
            {
                if( identifyType( split[i] ) === "date" )
                {
                    retMessage.Year = dateRef[split[i]].year;
                    retMessage.Month = dateRef[split[i]].month;
                    retMessage.Date = dateRef[split[i]].date;
                }
                else if( identifyType( split[i] ) === "direction" )
                    retMessage.Direction = directionRef[split[i]];
                else if( identifyType( split[i] ) === "category" )            
                    retMessage.Category = split[i];
                else if( Number.isInteger( Number(split[i] ) ) )
                    retMessage.Amount = split[i];                
                else
                    retMessage.Title += " "+split[i];                
            }
        }
    }

//============================================================================ 

    return retMessage;
}

module.exports = { sortFunction }
