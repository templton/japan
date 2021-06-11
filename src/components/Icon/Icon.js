import React from "react";



import {makeStyles} from '@material-ui/core/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, far, fas);



export const I = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > svg': {
                margin: theme.spacing(2),
            },
        },
    }));
    const classes = useStyles();
    const RenderIcon = () => {
        switch (props.children) {
            case 'phone':                           return  <FontAwesomeIcon icon={["far", "phone"]} {...props} className={classes.root}/>
            case 'favorite':                        return  <FontAwesomeIcon icon={["far", "heart"]} {...props} className={classes.root}/>
            case 'help':                            return  <FontAwesomeIcon icon={["far", "question"]} {...props} className={classes.root}/>
            case 'like':                            return  <FontAwesomeIcon icon={["far", "thumbs-up"]} {...props} className={classes.root}/>
            case 'dislike':                         return  <FontAwesomeIcon icon={["far", "thumbs-down"]} {...props} className={classes.root}/>
            case 'userChecked':                     return  <FontAwesomeIcon icon={["far", "user-check"]} {...props} className={classes.root}/>
            case 'userUnknown':                     return  <FontAwesomeIcon icon={["far", "user-times"]} {...props} className={classes.root}/>
            case 'location':                        return  <FontAwesomeIcon icon={["far", "map-marked-alt"]} {...props} className={classes.root}/>
            case 'whole':                           return  <FontAwesomeIcon icon={["far", "archive"]} {...props} className={classes.root}/>
            case 'disassembled':                    return  <FontAwesomeIcon icon={["far", "tools"]} {...props} className={classes.root}/>
            case 'dissected':                       return  <FontAwesomeIcon icon={["far", "cut"]} {...props} className={classes.root}/>
            case 'car':                             return  <FontAwesomeIcon icon={["far", "car"]} {...props} className={classes.root}/>
            case 'truck':                           return  <FontAwesomeIcon icon={["far", "truck"]} {...props} className={classes.root}/>
            case 'special':                         return  <FontAwesomeIcon icon={["far", "tractor"]} {...props} className={classes.root}/>
            case 'spare':                           return  <FontAwesomeIcon icon={["far", "toolbox"]} {...props} className={classes.root}/>
            case 'barcode':                         return  <FontAwesomeIcon icon={["far", "barcode"]} {...props} className={classes.root}/>
            case 'logout':                          return  <FontAwesomeIcon icon={["fas", "sign-in-alt"]} {...props} className={classes.root}/>
            case 'profile':                         return  <FontAwesomeIcon icon={["fas", "user-cog"]}  {...props} className={classes.root}/>
            case 'radio':                           return  props.checked ? <FontAwesomeIcon icon={["far", "check-circle"]}  {...props} className={classes.root}/> : <FontAwesomeIcon icon={["far", "circle"]}  {...props} className={classes.root}/>
            case 'delete':                          return  <FontAwesomeIcon icon={["far", "trash-alt"]}  {...props} className={classes.root}/>
            case 'filter':                          return  <FontAwesomeIcon icon={["fas", "filter"]}  {...props} className={classes.root}/>
            case 'add':                             return  <FontAwesomeIcon icon={["fas", "plus-circle"]}  {...props} className={classes.root}/>
            case 'excel':                           return  <FontAwesomeIcon icon={["far", "file-excel"]}  {...props} className={classes.root}/>
            case 'pdf':                             return  <FontAwesomeIcon icon={["far", "file-pdf"]}  {...props} className={classes.root}/>
            case 'search':                          return  <FontAwesomeIcon icon={["far", "search"]}  {...props} className={classes.root}/>
            case 'tag':                             return  <FontAwesomeIcon icon={["far", "tag"]}  {...props} className={classes.root}/>
            case 'tags':                            return  <FontAwesomeIcon icon={["far", "tags"]}  {...props} className={classes.root}/>
            case 'users':                           return  <FontAwesomeIcon icon={["fas", "users"]}  {...props} className={classes.root}/>
            case 'man':                             return  <FontAwesomeIcon icon={["far", "user"]}  {...props} className={classes.root}/>
            case 'userTag':                         return  <FontAwesomeIcon icon={["far", "user-tag"]}  {...props} className={classes.root}/>
            case 'cargo':                           return  <FontAwesomeIcon icon={["fas", "dolly"]}  {...props} className={classes.root}/>
            case 'ship':                            return  <FontAwesomeIcon icon={["far", "ship"]}  {...props} className={classes.root}/>
            case 'anchor':                          return  <FontAwesomeIcon icon={["fas", "anchor"]}  {...props} className={classes.root}/>
            case 'port':                            return  <FontAwesomeIcon icon={["fas", "anchor"]}  {...props} className={classes.root}/>
            case 'voyage':                          return  <FontAwesomeIcon icon={["fas", "route"]}  {...props} className={classes.root}/>
            case 'file':                            return  <FontAwesomeIcon icon={["far", "file-alt"]}  {...props} className={classes.root}/>
            case 'frame':                           return  <FontAwesomeIcon icon={["far", "digital-tachograph"]}  {...props} className={classes.root}/>
            case 'invoice':                         return  <FontAwesomeIcon icon={["fas", "file-invoice"]}  {...props} className={classes.root}/>
            case 'images':                          return  <FontAwesomeIcon icon={["far", "images"]}  {...props} className={classes.root}/>
            case 'image':                           return  <FontAwesomeIcon icon={["far", "image"]}  {...props} className={classes.root}/>
            case 'link':                            return  <FontAwesomeIcon icon={["far", "link"]}  {...props} className={classes.root}/>
            case 'plus':                            return  <FontAwesomeIcon icon={["far", "plus"]}  {...props} className={classes.root}/>
            case 'settings':                        return  <FontAwesomeIcon icon={["fas", "cogs"]}  {...props} className={classes.root}/>
            case 'attach':                          return  <FontAwesomeIcon icon={["far", "paperclip"]}  {...props} className={classes.root}/>
            case 'smile':                           return  <FontAwesomeIcon icon={["far", "smile"]}  {...props} className={classes.root}/>
            case 'fake':                            return  <FontAwesomeIcon icon={["far", "grin-tongue-wink"]} {...props} className={classes.root}/>
            case 'partner':                         return  <FontAwesomeIcon icon={["far", "user"]} {...props} className={classes.root}/>
            case 'partners':                        return  <FontAwesomeIcon icon={["fas", "people-arrows"]} {...props} className={classes.root}/>
            case 'vinyl':                           return  <FontAwesomeIcon icon={["far", "record-vinyl"]} {...props} className={classes.root}/>
            case 'user':                            return  <FontAwesomeIcon icon={["fas", "user-shield"]} {...props} className={classes.root}/>

            default: return null
        }
    }
    return (
            <RenderIcon />
    )
}
