package edu.brown.cs.student.dijkstra;

import edu.brown.cs.student.heuristic.Heuristic;
import edu.brown.cs.student.pathfinder.AbstractPathFinder;
import edu.brown.cs.student.pathfinder.Edge;
import edu.brown.cs.student.pathfinder.Vertex;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;


/**
 * Class to execute the Dijkstra algorithm.
 * @param <E> type implementing edge interface
 * @param <V> type implementing vertex interface
 * @param <H> type implementing heuristic interface
 *
 */
public class Astar<V extends Vertex<V, E>, 
E extends Edge<V, E>, H extends Heuristic<V, E>> extends AbstractPathFinder<V,E,H> {

  private final H heuristic = null;
  private final PriorityQueue<HeapEntry<V>> openA = new PriorityQueue<>();
  private final PriorityQueue<HeapEntry<V>> openB = new PriorityQueue<>();
  private final Map<V, V> parentsA = new HashMap<>();
  private final Map<V,V> parentsB = new HashMap<>();
  private final Map<V, Double> distanceA = new HashMap<>();
  private final Map<V, Double> distanceB = new HashMap<>();
  private final Set<V> closed = new HashSet<>();


  private double fA;
  private double fB;
  private double bestPathLength;
  private V meetNode = null;
  private V sourceNode;
  private V targetNode;


  /**
   * Default constructor with given heuristic.
   * @param heuristic a Heuristic.
   */
  public Astar(H heuristic) {
    super(heuristic);
  }


  @Override
  public List<V> search(V sourceNode, V targetNode) {

    if (sourceNode.equals(targetNode)) {
      return new ArrayList<V>(Arrays.asList(sourceNode));
    }
    clear(sourceNode, targetNode);
    while (!openA.isEmpty() && !openB.isEmpty()) {
      if (openA.size() < openB.size()) {
        expandForward();
      } else {
        expandBackward();
      }
    }
    if (meetNode == null) {
      return new ArrayList<V>();
    }
    return tracebackPath(meetNode, parentsA, parentsB);
  }


  private void expandForward() {
    V currentNode = openA.remove().getNode();
    if (closed.contains(currentNode)) {
      return;
    }
    closed.add(currentNode);

    //rejection criteria
    if ((distanceA.get(currentNode) + 
        heuristic.getDistance(currentNode, targetNode)) >= 
        bestPathLength ||
        (distanceA.get(currentNode) + 
            fB - heuristic.getDistance(currentNode, sourceNode)) >= 
            bestPathLength) {
    } else {

      for (E childEdge : currentNode.getForwardNeighbors()) {
        V childNode = childEdge.getDestination();
        if (closed.contains(childNode)) {
          continue;
        }


        double temp = distanceA.get(currentNode) + childEdge.getWeight();

        if (!distanceA.containsKey(childNode) || 
            distanceA.get(childNode) > temp) {

          childNode.setBestIncoming(childEdge);

          distanceA.put(childNode, temp);
          parentsA.put(childNode, currentNode);



          HeapEntry<V> e = new HeapEntry<V>(childNode,
              temp + heuristic.getDistance(childNode, targetNode));

          openA.add(e);

          if (distanceB.containsKey(childNode)) {
            double pathLength = temp + distanceB.get(childNode);
            if (bestPathLength > pathLength) {
              bestPathLength = pathLength;
              meetNode = childNode;
            }
          }

        }
      }	
    }
    if (!openA.isEmpty()) {
      fA = openA.peek().getDistance();
    }
  }

  private void expandBackward() {
    V currentNode = openB.remove().getNode();
    if (closed.contains(currentNode)) {
      return;
    }

    //rejection criteria

    if (distanceB.get(currentNode) + 
        heuristic.getDistance(currentNode, sourceNode) 
    >= bestPathLength || distanceB.get(currentNode) + fA -
    heuristic.getDistance(currentNode, targetNode) >= bestPathLength) {

    } else {
      for (E parentEdge : currentNode.getBackwardNeighbors()) {
        V parentNode = parentEdge.getSource();
        if (closed.contains(parentNode)) {
          continue;
        }

        double temp = distanceB.get(currentNode) + 
            parentEdge.getWeight();


        if (!distanceB.containsKey(parentNode) || 
            distanceB.get(parentNode) > temp) {

          currentNode.setBestIncoming(parentEdge);
          distanceB.put(parentNode, temp);
          parentsB.put(parentNode, currentNode);

          HeapEntry<V> e = new HeapEntry<V>(parentNode,
              temp + heuristic.getDistance(parentNode, targetNode));

          openB.add(e);

          if (distanceA.containsKey(parentNode)) {
            double pathLength = temp + distanceA.get(parentNode);
            if (bestPathLength > pathLength) {
              bestPathLength = pathLength;
              meetNode = parentNode;
            }
          }
        }
      }
    }

    if (!openB.isEmpty()) {
      fB = openB.peek().getDistance();
    }
  }


  private void clear(V sourceNode, V targetNode) {
    openA.clear();
    openB.clear();
    parentsA.clear();
    parentsB.clear();
    distanceA.clear();
    distanceB.clear();
    closed.clear();

    double totalDist = heuristic.getDistance(sourceNode, targetNode);
    fA = totalDist;
    fB = totalDist;
    bestPathLength = Double.MAX_VALUE;
    meetNode = null;
    this.sourceNode = sourceNode;
    this.targetNode = targetNode;
    openA.add(new HeapEntry<V>(sourceNode, fA));
    openA.add(new HeapEntry<V>(targetNode, fA));
    parentsA.put(sourceNode,null);
    parentsA.put(targetNode,null);
    distanceA.put(sourceNode, 0.0);
    distanceB.put(targetNode, 0.0);

  }

}

