import React from 'react'

const Links = ({projectFirestore}) => {

    // ------------------------ states ------------------------ //
    // Fetch loading state
    const [loadingState, setLoadingState] = React.useState(true);
    // Subtypes for links
    const [types, setTypes] = React.useState([]);
    // Type data
    const [linksData, setLinksData] = React.useState([]);


    React.useEffect(() => {
        loadingState && projectFirestore.collection('studies').doc('links').get().then((data) => {
            setTypes(data.data().metadata);
        });

        let ld = [];
        loadingState && types.forEach((type, index) => {
            projectFirestore.collection('studies').doc('links').collection(type).get().then(linkDataSet => {
                linkDataSet.forEach((linkData) => {
                    let data = linkData.data();
                    let id = linkData.id;
                    data = {...data, id, type};
                    ld.push(data);
                });
            }).then(() => { 
                if (index === types.length-1) {    
                    setLinksData(...linksData, ld);
                    console.log(linksData);
                    setLoadingState(false);
                }
            })
        });
    }, [projectFirestore, setTypes, loadingState, types, linksData]);

    return (
        <div>
            
        </div>
    )
}

export default Links
