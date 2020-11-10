import networkx as nx
import matplotlib.pyplot as plt
import pydot
from preprocess import _expand_lis
from preprocess import get_info_from_catalog


def generate_prereq_graph(course_raw, save_addr=None):
    expe_graph = []
    for line in course_raw:
        expe_graph.append((line['num'], _expand_lis(line['formatted_pre'])))
    G = nx.DiGraph()

    for p in expe_graph:
        if len(p[1]) == 0: continue
        fr = p[0]
        to = p[1]
        if fr not in G.nodes():
            G.add_node(fr)
        for t in to:
            if t not in G.nodes():
                G.add_node(t)
            G.add_edge(t, fr)

    nx.draw_networkx(G, pos=nx.nx_pydot.pydot_layout(G), font_size=1, node_size=20, width=0.1, arrowsize=2, arrowstyle='->')
    if save_addr is not None:
        plt.savefig(save_addr)
    else:
        plt.show()


if __name__ == "__main__":
    course_raw = get_info_from_catalog("https://www.ucsd.edu/catalog/courses/CSE.html")
    generate_prereq_graph(course_raw, 'CSE.png')