import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Icon} from '../Icon';
import Grid from "@material-ui/core/Grid";
import ProductCard from "../ProductCard";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%',
        paddingTop: 70,
    },
}));

export default function ProductGroupsMenu(props) {
    const {groups} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const GroupProducts = (props) => {
        const {groupId} = props;
        const group = groups[groupId];
        const renderGroups = () => {
            const products = group.products.map((product, index) => {
                return (
                    <ProductCard
                        key={index}
                        id={product.id}
                        title={product.title}
                        description={product.subtitle}
                        image={product.image}
                        price={product.base_price}
                        tags={product.product_tags}
                    />
                )
            })
            return (
                <>
                    <Grid
                        key={groups[groupId].id}
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography noWrap variant="h4">
                                {groups[groupId].title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                    >
                        {products}
                    </Grid>
                </>
            )

        };
        return renderGroups();
    }

    const Groups = (props) => {
        const {groupIds} = props;
        return (
            <>
                {groupIds.map((groupId, index) => {
                    return (<GroupProducts key={index} groupId={groupId - 1}/>);
                })}
            </>
        )
    }

    return groups ? (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
            >
                <Tab key={0} label={`all`} icon={<Icon>fastfood</Icon>} {...a11yProps(0)} />
                {groups.map(group => (<Tab key={group.id} label={`${group.title}s`}
                                           icon={<Icon>{group.title}</Icon>} {...a11yProps(group.id)} />))}
            </Tabs>
            <TabPanel key={0} value={value} index={value}>
                <Groups groupIds={value === 0 ? [1, 2, 3, 4, 5] : [value]}/>
            </TabPanel>
        </div>
    ) : <></>;
}
