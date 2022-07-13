from hashlib import md5
import imp
import random

class User:
    def __init__(self, username:str, password:str) -> None:
        self.m_username = username
        self.m_password = password
        self.m_traffic = 0
    
    def increase_traffic(self) -> None:
        self.m_traffic += random.randint(1, 5)

    def get_traffic(self):
        return self.m_traffic

    def is_correct(self, password:str) -> bool:
        return password == self.m_password