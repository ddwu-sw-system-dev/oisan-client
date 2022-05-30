const Signup = () => {

	const checkEmailDuplicate = email => new Promise((resolve) => {
    if (EMAILS.includes(email)) {
      resolve(true);
      return;
    }
  
    resolve(false);
  });

	const isEmailDuplicate = async (values) => {
    var isDuplicated = await checkEmailDuplicate(values);
    if (!isDuplicated) {
      message.success('Sign up is complete.');
      //회원가입 시키기
      return;
    } else {
      form.setFields({
        email: {
          value: values,
          errors: [new Error('email is duplicated!')],
        },
      });
    }
  }
    return(<div></div>);
};

export default Signup();