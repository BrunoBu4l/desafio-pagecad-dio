import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const schema = yup.object({
    email: yup.string().email('email não é valido!').required('Campo obrigatório!'),
    senha: yup.string().min(3, 'Erro! No mínimo três caracteres!').required('Campo obrigatório!'),
  }).required();

const Login = () => {

    const navigate = useNavigate()

    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        //reValidateMode: 'onChange',
        mode: 'onChange',
    });

    //console.log( errors) 

    const onSubmit = async formData => {
        try{ 
            const {data} = await api.get(`users?email=${formData.email}&senha=${formData.senha}`);
            if(data.length === 1){
                navigate('/feed')
                return
            }else{
                alert('Usuário ou senha inválido')
            }
            console.log('retorno api', data)
           
        }catch(e){
            alert('Houve um Erro!'+e)
        }
    };

    //console.log('errors',  errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                       e entrar mais rápido nas empresas mais desejadas.
                 </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="email"    errorMessage={errors?.email?.message}    leftIcon={<MdEmail />} placeholder="E-mail"  name="email"    control={control} />
                        
                        <Input type="password" errorMessage={errors?.senha?.message} leftIcon={<MdLock />}  placeholder="Senha"   name="senha" control={control} />
                    
                        <Button title="Entrar" variant="secondary" type="submit" valid={isValid}/>
                    </form>
                    <Row>
                        <EsqueciText>Esqueci minha senha</EsqueciText>
                        <a href="./signUp"><CriarText>Criar Conta</CriarText></a>
                    </Row>
                </Wrapper>
            </Column> 
        </Container> 
    </>)
}

export { Login }