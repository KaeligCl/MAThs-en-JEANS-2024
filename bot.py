import pyautogui
import keyboard
import random

#pyautogui.displayMousePosition()
class Bot:
    def __init__(self):
        self.endBoucle = False
        
        self.player = 1
        self.L=[]
        
        self.play = []
        self.globalPlay = []
        
        self.player1Proba = {i: {color: [0 for _ in range(11)] for color in ['V', 'R', 'J', 'B']} for i in range(11)}
        self.player2Proba = {i: {color: [0 for _ in range(11)] for color in ['V', 'R', 'J', 'B']} for i in range(11)}
        
        self.betterCase = (0, '')
        
    def __str__(self):
        f = ''
        for ele in self.globalPlay:
            f += str(ele) + '\n' + '\n'
        return f
    
    def botAutoMove(self, turn):
        # réinitialise la varible pour pouvoir la réutiliser
        self.placeT = [i for i in range(11)]
        while True:
            # verifie si il reste des mouvement à faire
            if self.placeT == []:
                return
            if self.betterCase != (0, '') and self.betterCase[0] in self.placeT:
                self.color = self.invertConvertColor(self.betterCase[1])
                self.place = self.betterCase[0]
            else:
                # choisi aléatoirement un nombre entre 0 et 3 (inclu)
                self.color = random.randint(0,3)
                # choisi aléatoirement un coup entre tous les coups possible
                self.place = self.placeT[random.randint(0,len(self.placeT)-1)]
            # vérifie si la case est blanche (si la case n'est pas déjà cocher)
            if pyautogui.pixel(x=620+65*self.place, y=690) == (255, 255, 255):
                pyautogui.click(x=950+50*self.color, y=800)
                pyautogui.click(x=620+65*self.place, y=690)
                self.switch()
                # vérifie l'état de la partie en regardant dans le terminal du jeu
                try:
                    self.winPlayer1 = pyautogui.locateOnScreen("winPlayer1.png", region=(945, 870, 60, 40), grayscale=True)
                except:
                    self.winPlayer1 = None
                # si le joueur 1 a gagné, on retourn la valeur 1
                if self.winPlayer1 != None:
                    return 1
                self.play.append((self.player + 1, turn, (self.place, self.convertColor())))
                return
            else:
                self.placeT.remove(self.place)
    
    def bot1UpdateProba(self):
        for ele0 in self.globalPlay:
            if ele0[0] == 1:
                for ele1 in ele0[1]:
                    if ele1[0] == 1:
                        self.player1Proba[ele1[1]][ele1[2][1]][ele1[2][0]] += 1
                    if ele1[0] == 2:
                        self.player2Proba[ele1[1]][ele1[2][1]][ele1[2][0]] -= 1
        higher = 0
        color = ''
        for tour, data in self.player1Proba.items():
            for couleur, emplacements in data.items():
                if higher < max(emplacements):
                    higher = emplacements.index(max(emplacements))
                    color = couleur
            self.betterCase = (higher, color)
            higher = 0
            color = ''
    
    def bot2UpdateProba(self):
        for ele0 in self.globalPlay:                
            if ele0[0] == 0:
                for ele1 in ele0[1]:
                    if ele1[0] == 1:
                        self.player1Proba[ele1[1]][ele1[2][1]][ele1[2][0]] -= 1
                    if ele1[0] == 2:
                        self.player2Proba[ele1[1]][ele1[2][1]][ele1[2][0]] += 1
        higher = 0
        color = ''
        for tour, data in self.player2Proba.items():
            for couleur, emplacements in data.items():
                if higher < max(emplacements):
                    higher = emplacements.index(max(emplacements))
                    color = couleur
            self.betterCase = (higher, color)
            higher = 0
            color = ''
    
    def convertColor(self):
        if self.color == 0:
            return 'V'
        if self.color == 1:
            return 'R'
        if self.color == 2:
            return 'J'
        if self.color == 3:
            return 'B'
        
    def invertConvertColor(self, color):
        if color == 'V':
            return 0
        if color == 'R':
            return 1
        if color == 'J':
            return 2
        if color == 'B':
            return 3
        
    
    def switch(self):
        self.player = 1 - self.player

    def start(self):
        for f in range(1000):
            # clique sur le bouton 'Play Again'
            pyautogui.click(x=950, y=975)
            for i in range(11):
                if self.botAutoMove(i) == 1:
                    self.L.append(1)
                # arrête le programme si on appui sur 'q'
                if keyboard.is_pressed('q') == True:
                    self.endBoucle = True
                    break
            else:
                self.L.append(0)
            self.globalPlay.append((self.L[f-1], self.play))
            self.play = []
            botPlay.bot1UpdateProba()
            botPlay.bot2UpdateProba()
            if self.endBoucle == True:
                    break
        # calcule la moyenne des résultat
        print('Moyenne de victoire: ',self.result_average())


    def result_average(self):
        result = 0
        for ele in self.L:
            if ele == 0:
                result -= 1
            if ele == 1:
                result += 1
        return result







''' éxecution de bot '''
botPlay = Bot()
botPlay.start()

print(botPlay)