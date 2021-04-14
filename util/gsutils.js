const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../cred/secret_key.json')

const jp = require('jsonpath')

export const Doc = class {

    constructor(docID){
        this.doc = new GoogleSpreadsheet(docID)
    }
    async init() {
        await this.doc.useServiceAccountAuth(creds)
        await this.doc.loadInfo()
    }
    async getSheet(title) {
        this.sheet = await this.doc.sheetsByTitle[title]
    }

    async getColumnName() {
        return await this.sheet.loadHeaderRow()
    }

    async getRows(){ 
        this.rows = await this.sheet.getRows()
    }

    async insert(obj){
        await this.sheet.addRow(obj,{ insert:true})
    }
    
    async inserts(obj){
        await this.sheet.addRows(obj, { insert:true})
    }

    async updateRows() {
        await this.rows.save()
    }
    
    async clearSheet() {
        await this.sheet.clear()
    }

    async setDefaultHeader() {
        await this.sheet.setHeaderRow(["Product","Runtime","Duration","Status"])
    }

}
