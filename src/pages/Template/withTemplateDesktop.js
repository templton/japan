import React from "react";
import TemplateDesktop from "../Template";

export const withTemplateDesktop = Component => {
    const WithTemplateDesktop = (props) => {
        const {pageName} = props
        return (
            <TemplateDesktop page={pageName}>
                <Component {...props} />
            </TemplateDesktop>
        )
    }

    return props => <WithTemplateDesktop {...props} />
}
