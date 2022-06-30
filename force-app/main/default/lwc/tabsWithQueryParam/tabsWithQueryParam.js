import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
const DEFAULT_TAB_VALUE = 'tab1';

export default class TabsWithQueryParam extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference)
    currentPageReference;
    
    get activeTabValue(){
        return this.tabValueFromPageRef(this.currentPageReference);
    }

    tabValueFromPageRef({state: {c__tab}}){
        return c__tab ? c__tab: DEFAULT_TAB_VALUE;
    }

    onTabActive(event) {
        event.preventDefault();
        event.stopPropagation();
        const newTabValue = event.target.value;
        const oldTabValue = this.activeTabValue;
        if (newTabValue != oldTabValue) this[NavigationMixin.Navigate](this.newPageReference(newTabValue));
    }

    newPageReference(c__tab) {
        const state = {...this.currentPageReference.state, c__tab };
        return {...this.currentPageReference, state };
    }

}