export interface ProcedureCaller {
	call: (name: string, args: any[]) => Promise<any>;
}

export class RPCProcedureCaller {

}