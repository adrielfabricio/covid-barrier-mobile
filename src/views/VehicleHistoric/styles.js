import styled from 'styled-components';

export const Container = styled.View({
  flex: 1,
});

export const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const ModalView = styled.View({
  backgroundColor: 'white',
  borderRadius: 3,
  paddingTop: '15%',
  paddingBottom: '15%',
  alignItems: 'center',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: '0.25px',
  shadowRadius: 3.84,
  elevation: 5,
});
