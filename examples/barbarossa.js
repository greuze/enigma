var enigmajs = require('../');

/*
    Original message sent on July 7th 1941 (Operation Barbarossa, 1941) extracted from:
    http://draperg.cis.byuh.edu/archive/utah/cs4960-02-draperg/emulators/ENIGMA_standalone/Enigma%20Sim%20Manual.pdf

    Befordert am: 07.07.1941 1925 Uhr Durch:
    Funkspruch Nr.:20 Von/An: f8v/bz2
    Absendende Stelle : SS-T Div Kdr An: LVI A.K.

    fuer m7g 1840 - 2tl 1t 179 - WXC KCH –
    RFUGZ EDPUD NRGYS ZRCXN
    UYTPO MRMBO FKTBZ REZKM
    LXLVE FGUEY SIOZV EQMIK
    UBPMM YLKLT TDEIS MDICA
    GYKUA CTCDO MOHWX MUUIA
    UBSTS LRNBZ SZWNR FXWFY
    SSXJZ VIJHI DISHP RKLKA
    YUPAD TXQSP INQMA TLPIF
    SVKDA SCTAC DPBOP VHJK

    2tl 155 - CRS YPJ -
    FNJAU SFBWD NJUSE GQOBH
    KRTAR EEZMW KPPRB XOHDR
    OEQGB BGTQV PGVKB VVGBI
    MHUSZ YDAJQ IROAX SSSNR
    EHYGG RPISE ZBOVM QIEMM
    ZCYSG QDGRE RVBIL EKXYQ
    IRGIR QNRDN VRXCY YTNJR

    The plaintext, rearranged and with converted abbreviations:
    AUFKL[AERUNG] X ABTEILUNG X VON X KURTINOWA X KURTINOWA X
    NORDWESTL[ICH] X SEBEZ X SEBEZ X UAF FLIEGERSTRASZE
    RIQTUNG X DUBROWKI X DUBROWKI X OPOTSCHKA X OPOTSCHKA X UM X
    EINS AQT DREI NULL X UHR ANGETRETEN X ANGRIFF X INF X RGT X
    DREI GEHT LANGSAM ABER SIQER VORWAERTS X EINS SIEBEN NULL
    SEQS X UHR X ROEM[ISCHEN ZIFFER] X EINS X INF RGT X DREI X
    AUF FLIEGERSTRASZE MIT ANFANG X EINS SEQS X KM X KM X
    OSTW[EST] X KAMENEC X K
*/

/////////////////////////////////////////////////////
// Configuration of real 3 and 4-rotor enigma machine
/////////////////////////////////////////////////////

var rotors = [];
rotors.push(new enigmajs.Rotor('EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'Q', 'I'));
rotors.push(new enigmajs.Rotor('AJDKSIRUXBLHWTMCQGZNPYFVOE', 'E', 'II'));
rotors.push(new enigmajs.Rotor('BDFHJLCPRTXVZNYEIWGAKMUSQO', 'V', 'III'));
rotors.push(new enigmajs.Rotor('ESOVPZJAYQUIRHXLNFTGKDCMWB', 'J', 'IV'));
rotors.push(new enigmajs.Rotor('VZBRGITYUPSDNHLXAWMJQOFECK', 'Z', 'V'));
// Last three rotors are for 4-rotors machine
rotors.push(new enigmajs.Rotor('JPGVOUMFYQBENHZRDKASXLICTW', 'ZM', 'VI'));
rotors.push(new enigmajs.Rotor('NZJHGRCXMYSWBOUFAIVLPEKQDT', 'ZM', 'VII'));
rotors.push(new enigmajs.Rotor('FKQHTLXOCBJSPDZRAMEWNIUYGV', 'ZM', 'VIII'));

var reflectors = [];
reflectors.push(new enigmajs.Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT', 'M3 B'));
reflectors.push(new enigmajs.Reflector('FVPJIAOYEDRZXWGCTKUQSBNMHL', 'M3 C'));
reflectors.push(new enigmajs.Reflector('ENKQAUYWJICOPBLMDXZVFTHRGS', 'M4 thin B'));
reflectors.push(new enigmajs.Reflector('ENKQAUYWJICOPBLMDXZVFTHRGS', 'M4 thin C'));

var entryWheel = new enigmajs.EntryWheel('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

/////////////////////////////////////////////////////
// Day specific configuration (July 7th 1941)
/////////////////////////////////////////////////////

var enigma = new enigmajs.Enigma(
    [rotors[1], rotors[3], rotors[4]], // Rotors II, IV, V
    reflectors[0], // Reflector B
    new enigmajs.Plugboard('AV BS CG DL FU HZ IN KM OW RX'),
    entryWheel);
enigma.setRingSettings('BUL');

/////////////////////////////////////////////////////
// Message specific configuration (part I)
/////////////////////////////////////////////////////

// Decipher the message key (part I)
enigma.setPositions('WXC');
var messageKey1 = enigma.string('KCH');
enigma.setPositions(messageKey1); // Should be BLA
// Decipher the message with deciphered message key (removing leading Kenngruppe)

var message1 =
    'EDPUD NRGYS ZRCXN UYTPO MRMBO FKTBZ REZKM LXLVE ' +
    'FGUEY SIOZV EQMIK UBPMM YLKLT TDEIS MDICA GYKUA ' +
    'CTCDO MOHWX MUUIA UBSTS LRNBZ SZWNR FXWFY SSXJZ ' +
    'VIJHI DISHP RKLKA YUPAD TXQSP INQMA TLPIF SVKDA ' +
    'SCTAC DPBOP VHJK';
console.log('Operation Barbarossa (part I): %s', enigma.string(message1));

/////////////////////////////////////////////////////
// Message specific configuration (part II)
/////////////////////////////////////////////////////

// Decipher the message with deciphered message key (removing leading Kenngruppe)
enigma.setPositions('CRS');
var messageKey2 = enigma.string('YPJ');
enigma.setPositions(messageKey2); // Should be LSD
// Decipher the message with deciphered message key

var message2 =
    'SFBWD NJUSE GQOBH KRTAR EEZMW KPPRB XOHDR OEQGB ' +
    'BGTQV PGVKB VVGBI MHUSZ YDAJQ IROAX SSSNR EHYGG ' +
    'RPISE ZBOVM QIEMM ZCYSG QDGRE RVBIL EKXYQ IRGIR ' +
    'QNRDN VRXCY YTNJR';
console.log('Operation Barbarossa (part II): %s', enigma.string(message2));
