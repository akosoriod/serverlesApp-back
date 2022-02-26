export interface IParams {
    TableName: string,
    IndexName?: string,
    KeyConditionExpression?: string,
    FilterExpression?: string,
    ExpressionAttributeValues?: object
    ExpressionAttributeNames?: object
    ScanIndexForward?: boolean,
    Limit?: number,
    ExclusiveStartKey?: object
  } 
export interface IResponse {
    Items:Array<any>,
    Count?: number,
    ScannedCount?:number
  }
export interface IKeys {
    PK:string,
    SK:string
  }
 export interface IQuery {
    Items: Array<any>,
    Count: number,
    ScannedCount: number
}