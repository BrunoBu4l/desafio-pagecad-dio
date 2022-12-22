import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Container, Title, Column, TitleLogin, SubtitleLogin,CriarText,Paragrafo, Row, Wrapper } from './styles';

const schema = yup.object({
  name: yup.string().min(5, 'no minimo 5 caracteres!').required('Campo obrigatório!'),
  email: yup.string().email('email não é valido!').required('Campo obrigatório!'),
  senha: yup.string().min(3, 'Erro! No mínimo três caracteres!').required('Campo obrigatório!'),
}).required();

const SignUp = () => {


  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    //reValidateMode: 'onChange',
    mode: 'onChange',
  });

    const onSubmit = async (formData) => {
        try{

            alert('Funcionando! Nome: '+ formData.name + ', email: '+ formData.email + ' e senha: '+ formData.senha)
        }catch(e){
            alert("Erro: "+e)
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text"    errorMessage={errors?.name?.message}    leftIcon={<MdPerson />} placeholder="Nome Completo"  name="name"    control={control} />

                        <Input type="email"    errorMessage={errors?.email?.message}    leftIcon={<MdEmail />} placeholder="E-mail"  name="email"    control={control} />
                        
                        <Input type="password" errorMessage={errors?.senha?.message} leftIcon={<MdLock />}  placeholder="Senha"   name="senha" control={control} />
                    
                        <Button title="Criar minha conta" variant="secondary" type="submit" valid={isValid}/>
                    </form>
                    <Paragrafo>Ao clicar em "criar minha conta grátis", declaro que aceito as políticas de privacidade e os termos de uso da DIO.</Paragrafo>
                <Row>
                    <p>Já tenho conta.</p><a href="./login"><CriarText>Fazer login</CriarText></a>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { SignUp }