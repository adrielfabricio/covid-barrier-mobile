import styled from 'styled-components/native';

export const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F5F5F5',
});

export const Logo = styled.Image({
  height: '30%',
  marginBottom: '7%',
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

export const Footer = styled.View({
  width: '100%',
  height: '7%',
  paddingLeft: '5%',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'flex-start',
  position: 'absolute',
  bottom: 0,
});
