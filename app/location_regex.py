import re
from collections import defaultdict

rx = re.compile(r'''
    ^
    (?P<actor>[A-Z][^:\n\r]+):\s*
    (?P<text>[\s\S]+?)
    (?=^[A-Z]|\Z)
    ''', re.MULTILINE | re.VERBOSE)

# # create the nested defaultdict
# result = defaultdict(lambda : defaultdict(int))

def getLocation(string):
    for m in rx.finditer(string):
        start = m.start()
        line = string.count('\n', 0, start) + 1
        if m.group('actor').strip()=='Location' or m.group('actor').strip()=='location':
            return(m.group('text'))
    return False
# print(result)