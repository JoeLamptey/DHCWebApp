class User:
    def __init__(self, firstname, lastname):
        self.firstname = firstname
        self.lastname = lastname
    
    def myname(self):
        first = self.firstname
        last = self.lastname

        print('My name is '+first+' '+last)

if __name__ == "__main__":
    user = User('Joe', 'Lamptey')
    user.myname()