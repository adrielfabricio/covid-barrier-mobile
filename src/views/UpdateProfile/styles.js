import styled from 'styled-components/native';

export const Container = styled.View({
  flex: 1,
  paddingTop: 30,
});

export const FormView = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Input = styled.TextInput({
  paddingHorizontal: '20px',
  paddingVertical: '15px',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  alignSelf: 'stretch',
  marginBottom: '15px',
  marginHorizontal: '20px',
  fontSize: '16px',
});
