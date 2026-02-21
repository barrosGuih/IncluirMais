import Aluno from "../../../alunos/aluno";

export default ({params}) => (
    <Aluno nome={params.aluno} />
);