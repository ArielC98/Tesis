import React from "react";
import {Page, Text, Document, StyleSheet,Image} from "@react-pdf/renderer"


const styles = StyleSheet.create({
    body:{
    paddingTop:35,
    paddingBottom:65,
    paddingHorizontal:35,
    },
    title:{
    fontSize: 24,
    textAlign: "center",
    },
    text:{
    margin:12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily:"Times-Roman"
    },
    image:{
    marginVertical: 15,
    marginHorizontal:100,
    },
    header:{
    fontSize:12,
    marginBottom:20,
    textAlign:"center",
    color:"grey"
    },
    pageNumber:{
    position:"absolute",
    fontSize:12,
    bottom:30,
    left:0,
    right:0,
    textAlign:"center",
    color:"gray"
    }
});

const PDFFile = () => {
    

    return (


            <Document>
                <Page style={styles.body}>
                <Text style={styles.header} fixed></Text>
                <Image src="../assets/icon/icon.png"></Image>
                <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolorem praesentium, omnis amet obcaecati incidunt minima quas totam qui consequatur blanditiis ut vero inventore eius. Minus adipisci nam alias exercitationem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed harum, corrupti tempora officiis quasi sit necessitatibus inventore recusandae ad velit? Repudiandae, recusandae. Error, quibusdam modi suscipit sit adipisci doloremque ipsum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem sequi animi eligendi cupiditate eveniet quae doloremque. Culpa, aperiam! Laborum consequuntur asperiores soluta dolor velit inventore tenetur nesciunt beatae cum dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas fugiat similique aliquid nisi odit tempore nostrum natus debitis repellat possimus. In nisi optio dicta iste cumque amet neque et consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsam nostrum dicta culpa? Ex, rerum? Culpa error quibusdam numquam laboriosam laudantium repudiandae earum pariatur placeat rerum ut? Dolorum, repellendus itaque.
                </Text>
                <Text
                    style={styles.pageNumber}
                    render = {({pageNumber,totalPages}) => `${pageNumber} / ${totalPages}`}
                    fixed
                />


                </Page>
            </Document>

    );
};

export default PDFFile;