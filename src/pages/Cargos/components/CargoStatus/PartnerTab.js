import { useState, useContext } from "react";
import { translate } from "../../../../utils/translate";
import { RenderExtra } from "./RenderExtra";
import {ESelect} from "../../../../components/EditableField";
import {FormContext} from "../../../../components/FormContext/FormContext";
import {DictionaryContext} from "../../../../components/DictionaryContext/DictionaryContext";
import { DatePicker, Form, Select, TextField } from "material-ui-pack"


//TODO ИСПОЛЬЗОВАТЬ withPartner совместно с селектами партнеров в overview

export const PartnerTab = (props) => {
    const { cargoData, partnerDictionary, changeCargoFieldHandler, partnerFieldName, title } = props;
    const dictionaries = useContext(DictionaryContext);
    const formContext = useContext(FormContext);

    const [extra, setExtra] = useState(JSON.parse(cargoData && cargoData[partnerFieldName] ? cargoData[partnerFieldName].extraFields : '{}'));
    const [owner, setOwner] = useState(cargoData && cargoData[partnerFieldName] ? cargoData[partnerFieldName].owner : {});

    //const partnerItems = partnerDictionary.map(item => item.title);
    const partnerItems = dictionaries.partners.map(item => ({
        value: item.id,
        label: item.title
    }));

    const changeHandler = (value, index) => {
        const partner = partnerDictionary[index];
        changeCargoFieldHandler(partner, partnerFieldName);
        console.log('partnerDictionary[index]', partnerDictionary[index]);
        setExtra(JSON.parse(partner.extraFields))
        setOwner(partner.owner);
    }

    const noop = () => {};

    const fieldName = partnerFieldName == 'customs' ? "customsPartnerId" : "receiverPartnerId";

    return (
        <Form onSubmit={noop} state={formContext.formState} setState={formContext.setFormState}>
            <div>
                <h2>{title}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>NAME: </td>
                        <td>
                            <Select name={fieldName} options={partnerItems} nullLabel={"SELECT PARTNER..."} allowNull={true} />
                        </td>
                    </tr>
                    <tr>
                        <td>OWNER NAME:</td>
                        <td>{owner.name}</td>
                    </tr>
                    </tbody>
                </table>

                <RenderExtra extra={extra}/>

            </div>
        </Form>
    );
}
