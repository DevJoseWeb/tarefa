export interface IListarGrupoEmpresaOutput {
    gruposEmpresas: IGruposEmpresas;
}

export interface IGruposEmpresas {
    id: string;
    grupo: number;
    nomeGrupo: string;
    cnpjRaiz?: string;
    label: string;
    value: string;
}
