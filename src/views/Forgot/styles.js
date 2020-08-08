import styled from 'styled-components/native';

export const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F5F5F5',
});

export const TitleContainer = styled.View({
  marginBottom: 40,
});

export const Title = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  color: '#404040',
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
